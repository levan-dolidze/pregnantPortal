import { FormGroup } from "@angular/forms"


export class FieldModeControl {
   static formFieldsModeControl(mode:string, form:FormGroup) {
        Object.keys(form.controls).forEach((fields) => {
            const controls:any = form.get(fields)
            controls[mode]({ onlySelf: true })
        })
    };
};

