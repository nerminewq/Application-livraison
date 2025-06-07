#  Application de Livraison – Spring Boot + Angular + MySQL

Une application web complète de gestion de livraison de repas impliquant quatre rôles : **Entreprise**, **Restaurant**, **Livreur** et **Client**.  
Chaque acteur interagit selon ses droits pour assurer une chaîne de livraison fluide et suivie.

---

## Acteurs et fonctionnalités

###  Entreprise de Livraison
- Assigne des livraisons aux livreurs disponibles
- Gère les statuts des restaurants (actif, inactif, etc.)

###  Restaurant
- Ajoute et gère ses plats
- Reçoit les commandes passées
- Met à jour le statut des commandes :
  - "En attente" → "En préparation"

### Livreur
- Consulte les livraisons à faire
- Accepte une livraison
- Confirme la livraison une fois effectuée

### Client
- Parcourt les restaurants disponibles et leurs plats
- Passe une commande
- Supprime une commande si elle est encore "En attente"
- Suit la livraison en temps réel
- Consulte son historique de commandes
- Confirme la réception d'une commande livrée

---

##  Technologies utilisées

| Partie       | Technologies                            |
|--------------|------------------------------------------|
| Backend      | Spring Boot (REST API), Spring Data JPA|
| Frontend     | Angular 19, TypeScript, Bootstrap       |
| Base de données | MySQL                                |
| Outils        | Postman |



