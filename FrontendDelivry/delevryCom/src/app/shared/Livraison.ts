import { Commande } from "./commmande";
import { Livreur } from "./Livreur";

export interface Livraison {
  id: number;
  dateLivraison: Date;
  statut: string // Example status values
  adresse: string;
  Nom:string,
  nomRestau:string,
 }