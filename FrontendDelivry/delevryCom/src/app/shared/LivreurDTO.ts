export interface LivreurDTO {
  id: number;
  nomComplet: string; // Combined first + last name
  matricule: string;
  disponible: boolean;
  vehiculeType?: string;
}
