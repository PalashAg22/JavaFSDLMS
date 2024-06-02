import { User } from "./User";

export class LoanApplicationRequest{
    loanId!:number;
    customerId!:number;
    propertyId!:number;
    loanTypeId!:number;
    principal!:string;
    tenureInMonths!:string;
    loanTypeName!:string;
    propertyAddress!:string;
    propertyAreaInm2!:number;
    propertyValue!:number;
}