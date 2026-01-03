import { Company } from "../entities/company.entity";
import { CompanyId } from "../value-objects/CompanyId";

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findById(id: CompanyId): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  delete(company: Company): Promise<void>;
}
