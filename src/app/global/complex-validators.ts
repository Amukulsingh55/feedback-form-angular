export class ComplexValidators {
    static checkRelation(controlOne:any, controlTwo:any) {
        return (control:any) => {
            let c1 = control.get(controlOne).value;
            let c2 = control.get(controlTwo).value;

            return (c1 == 'Old Washing Machine' && c2) ? { relationFail : true } : null; // return null if no error or return an error object
        };
    }
}