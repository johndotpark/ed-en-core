export type ProductCategory =
  | 'T-shirt'
  | 'Hoodie'
  | 'Sweatpants'
  | 'Denim'
  | 'Jacket'
  | 'Shorts'
  | 'Dress'
  | 'Other';

export type ProductionStage =
  | 'Manufacturer outreach'
  | 'Sample request'
  | 'Sample revision'
  | 'Pre-production confirmation'
  | 'Bulk quality control'
  | 'Packing confirmation'
  | 'Defect complaint';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';

export type Measurement =
  | 'Chest'
  | 'Waist'
  | 'Hips'
  | 'Inseam'
  | 'Sleeve length'
  | 'Shoulder width'
  | 'Body length'
  | 'Neck'
  | 'Thigh';

export type DefectCheck =
  | 'Stitching'
  | 'Color accuracy'
  | 'Sizing accuracy'
  | 'Fabric defects'
  | 'Pilling or snags'
  | 'Print quality'
  | 'Label placement'
  | 'Seam alignment';

export type PhotoRequirement =
  | 'Full garment front'
  | 'Full garment back'
  | 'Close-up stitching'
  | 'Label and tags'
  | 'Measurements flat lay'
  | 'Defect close-up'
  | 'Packing photo'
  | 'Sample vs bulk comparison';

export interface PromptBuilderFormData {
  productCategory: ProductCategory | '';
  productionStage: ProductionStage | '';
  sizes: Size[];
  measurements: Measurement[];
  constructionDetails: string;
  defectChecks: DefectCheck[];
  photoRequirements: PhotoRequirement[];
  packagingRequirements: string;
  brandName: string;
  styleNumber: string;
  customSizes: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  promptLink?: string;
  templateLink?: string;
}

export interface ChecklistStep {
  id: string;
  step: number;
  title: string;
  description: string;
  items: ChecklistItem[];
  promptLink?: string;
  templateLink?: string;
}

export interface TemplateCard {
  id: string;
  category: ProductCategory;
  description: string;
  pages: string[];
  pdfFile: string;
  illustratorFile: string;
  spreadsheetFile: string;
}
