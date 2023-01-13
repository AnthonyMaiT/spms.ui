import { FormGroup } from "@angular/forms";

export class CustomValidator {
    // validates when the start range is greater than the end range in form
    // would set error if so.
    static validateDate(control: FormGroup) {
        const start_range = control.get('start_range')?.value
        const end_range = control.get('end_range')?.value
        if (end_range < start_range) {
            control.get('end_range')?.setErrors({
                invalidDate: true
            })
            return {
                invalidDate: true
            }
        }
        return null
    }
}
