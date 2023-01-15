import { FormGroup } from "@angular/forms";

export class EventTimeValidator {
    // validates when the start time is greater than the end time in form
    // would set error if so
    static validateDateTime(control: FormGroup) {
        const start_time = control.get('start_time')?.value
        const end_time = control.get('end_time')?.value
        if (end_time < start_time) {
            control.get('end_time')?.setErrors({
                invalidDateTime: true
            })
            return {
                invalidDateTime: true
            }
        }
        return null
    }
}
