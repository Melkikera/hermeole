import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchPrimData } from '../../../api/prim';
import { Prim, Section } from '../../../domain/models/Prim';    
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import { secondsToHms } from '@/utils/maths';
import moment from 'moment';


const PrimWidget = () => {
    const [journey, setJourney] = useState<Prim | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sectionStyle = function(options: Section) {
        return {
            backgroundColor: `#${options.display_informations?.color}`,            
            color: `#${options.display_informations?.text_color}`,   
            fontweight: 'bold',       
            padding: 8,
            borderRadius: 4,
            marginBottom: 4,
        };
    }
    const iconOtherName = function(options: Section) {
        switch (options.mode?.toUpperCase()) {
            case 'WALKING':
                return 'walking';
            case 'BICYCLING':
                return 'bicycle';
            case 'DRIVING':
                return 'car';
            default:
                return 'question';
        }
    }
    const iconTransportName = function(options: Section) {
        switch (options.display_informations?.commercial_mode.toUpperCase()) {
            case 'MÉTRO':
                return 'subway';
            case 'BUS':
                return 'bus';
            case 'TRAMWAY':
                return 'tram';
            case 'RER':
                return 'train';
            case 'TRAIN TRANSILIEN':
                return 'train';
            default:
                return 'question';
        }
    }

    useEffect(() => {
        const getPrimData = async () => {
            try {
                const result = await fetchPrimData();                
                let journey = result.journeys && {                    
                    DepartureTime: result.journeys[0].departure_date_time,
                    ArrivalTime: result.journeys[0].arrival_date_time,
                    Duration: result.journeys[0].duration,
                    NbTransferts: result.journeys[0].nb_transfers
                };
                let sections = result.journeys[0].sections.map((section:any) => ({
                    type: section.type,
                    duration: section.duration,
                    departure_date_time: section.departure_date_time,
                    arrival_date_time: section.arrival_date_time,
                    from: section.from,
                    to: section.to,
                    mode: section.mode,
                    display_informations: section.display_informations
                }));

                journey = { ...journey, sections };
                // console.log('Parsed journey data:', journey);
                setJourney(journey);                
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        getPrimData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Itinéraire près de chez vous</Text>
            <Text>Heure de départ : {journey ? moment(journey.DepartureTime).format('HH:mm:ss') : 'No data available'}</Text>
            <Text>Lieu de départ : {journey ? journey.sections[0].from.name : 'No data available'}</Text>
            {journey && journey.sections.map((section: Section) => {
                if (section.type == 'public_transport') {
                    return (
                        <><View key={section.departure_date_time} style={styles.box}>
                            <Text style={sectionStyle(section)}>
                                {section.display_informations?.label}                                
                            </Text>
                        </View>
                        <View key={section.departure_date_time + '_icons'}>
                            <Text>
                                <FontAwesome5 name={iconTransportName(section)} size={20} iconStyle='solid' />{' > '} {secondsToHms(section.duration)}
                            </Text>
                        </View></>                        
                    );
                }
                 else if (section.mode === 'walking') {
                    return (
                        <>
                        <View key={section.departure_date_time + '_icons'}>
                            <Text>
                                <FontAwesome5 name={iconOtherName(section)} size={20} iconStyle='solid' /> {' > '} {secondsToHms(section.duration)}
                            </Text>
                        </View></>
                    );
                }
                return null;
            }
            )
            }
            <Text>Heure d'arrivée : {journey ? moment(journey.ArrivalTime).format('HH:mm:ss') : 'No data available'}</Text>
            <Text>Lieu d'arrivée : {journey ? journey.sections[journey.sections.length - 1].to.name : 'No data available'}</Text>
            <Text>Durée : {journey ? secondsToHms(parseInt(journey.Duration)) : 'No data available'}</Text>
            <Text>Nombre de transferts : {journey ? journey.NbTransferts : 'No data available'}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
    },
    box: {
        height: 50,
        justifyContent: 'center',
        width: 50,
        borderRadius: 60
    },
});

export default PrimWidget;