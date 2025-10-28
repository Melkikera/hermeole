export interface Prim {
    sections: any;
    id: string;
    DepartureTime: string;
    ArrivalTime: string;
    Duration: string;
    NbTransferts: number;
}

export interface Section{
    type: string;
    mode?: string;
    duration: number;
    departure_date_time: string;
    arrival_date_time: string;
    from: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        }
    };
    to: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        }
    };
    display_informations?: {
        code: string;
        color: string;
        description: string;
        direction: string;
        label: string;
        network: string;
        physical_mode: string;
        text_color: string;
        trip_headsign: string;
        commercial_mode: string;
    };
}