export enum AlertTypes {
    Success,
    Error,
    Info,
    Warning
}


export class Alert {
    id: string;
    type: AlertTypes;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}