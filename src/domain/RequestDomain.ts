export interface QueryDomain {
    id: string;
    key: string;
    value: string;
    desc: string;
    status: string;
    check: boolean;
}

export interface HeaderDomain {
    id: string;
    key: string;
    value: string;
    desc: string;
    status: string;
    check: boolean;
}

export interface BodyDomain {
    id: string;
    type: number;
    key: string;
    value: string;
    desc: string;
    status: string;
    check: boolean;
}

export interface HeaderOption {
    id: string;
    label: string;
    value: string;
}

export const headerOptions: HeaderOption[] = [
    {
        "id": "1",
        "label": "Accept",
        "value": "Accept"
    },
    {
        "id": "2",
        "label": "Accept-Charset",
        "value": "Accept-Charset"
    },
    {
        "id": "3",
        "label": "Accept-Encoding",
        "value": "Accept-Encoding"
    },
    {
        "id": "4",
        "label": "Authorization",
        "value": "Authorization"
    },
    {
        "id": "5",
        "label": "Content-Type",
        "value": "Content-Type"
    },
    {
        "id": "6",
        "label": "Content-Length",
        "value": "Content-Length"
    },
    {
        "id": "7",
        "label": "Cookie",
        "value": "Cookie"
    },
]