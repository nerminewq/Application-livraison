import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { LivraisonService } from '../Services/livraison.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstant } from '../shared/globalConstant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-assign-delevry',
  standalone:false,
  templateUrl: './assign-delevry.component.html',
  styleUrls: ['./assign-delevry.component.css']
})
export class AssignDelevryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'client', 'restaurant', 'actions'];
  dataSource: any;
  livreursDisponibles: any[] = [];
  selectedLivraison: any;
  responseMessage: any;
  isLoading = false;

  constructor(
    private livraisonService: LivraisonService,
    private ngx: NgxUiLoaderService,
    private snackBar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ngx.start();
    this.loadPendingDeliveries();
  }

  loadPendingDeliveries() {
    this.livraisonService.getLivraisonsEnAttente().subscribe(
      (response: any) => {
        this.ngx.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }

  selectDelivery(livraison: any) {
    this.selectedLivraison = livraison;
    this.loadAvailableDeliveryPersons();
  }

  loadAvailableDeliveryPersons() {
    this.ngx.start();
    this.livraisonService.getLivreursDisponibles().subscribe(
      (response: any) => {
        this.ngx.stop();
        this.livreursDisponibles = response;
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }

  assignDeliveryPerson(livreur: any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: {
        message: `Assign ${livreur.prenom} ${livreur.nom} to delivery #${this.selectedLivraison.id}?`,
        confirmation: true
      }
    });

    dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.confirmAssignment(livreur.id);
      console.log(livreur.id)
      dialogRef.close();
    });
  }

  confirmAssignment(livreurId: number) {
    this.ngx.start();
    console.log(this.selectedLivraison.id, livreurId)
    this.livraisonService.affecterLivreur(this.selectedLivraison.id, livreurId).subscribe(
      (response: any) => {
        this.ngx.stop();
        this.responseMessage = response?.message || 'Delivery person assigned successfully';
        this.snackBar.openSnackBar(this.responseMessage, 'success');
        this.loadPendingDeliveries();
        this.selectedLivraison = null;
        this.livreursDisponibles = [];
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private handleError(error: any) {
    this.ngx.stop();
    if (error.error?.message) {
      this.responseMessage = error.error.message;
    } else {
      this.responseMessage = GlobalConstant.genericError;
    }
    this.snackBar.openSnackBar(this.responseMessage, 'error');
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'EN_ATTENTE': 'Pending',
      'EN_PREPARATION': 'Preparing',
      'EN_LIVRAISON': 'Delivering',
      'LIVREE': 'Completed',
      'ANNULÉE': 'Cancelled'
    };
    return statusLabels[status?.toUpperCase()] || status;
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'EN_ATTENTE':
        return 'status-pending';
      case 'EN_PREPARATION':
        return 'status-preparing';
      case 'EN_LIVRAISON':
        return 'status-delivering';
      case 'LIVREE':
        return 'status-completed';
      case 'ANNULÉE':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}