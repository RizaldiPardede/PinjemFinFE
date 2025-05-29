import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../core/service/BranchService';
import { BranchResponse } from '../../core/dto/BranchResponse';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';

@Component({
  selector: 'app-manajemen-branch',
  standalone: true,
  imports: [CommonModule, FormsModule,HasFeatureDirective],
  templateUrl: './manajemen-branch.component.html',
  styleUrls: ['./manajemen-branch.component.css']
})
export class ManajemenBranchComponent implements OnInit {
  branches: BranchResponse[] = [];
  filteredBranches: BranchResponse[] = [];
  searchTerm: string = '';
  
  // Data untuk form
  formData: BranchResponse = {
    nama_branch: '',
    alamat_branch: '',
    latitude_branch: 0,
    longitude_branch: 0
  };

  selectedBranch: BranchResponse | null = null;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.getBranches();
  }

  // Method to filter branches based on search term
  filterBranches(): void {
    if (!this.searchTerm) {
      this.filteredBranches = [...this.branches]; // Reset to all branches when no search term
    } else {
      this.filteredBranches = this.branches.filter((branch) =>
        branch.nama_branch.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.alamat_branch.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Fetch all branches from the service
  getBranches(): void {
    this.branchService.getAllBranches().subscribe(data => {
      this.branches = data;
      this.filteredBranches = [...data]; // Initialize filteredBranches with fetched data
    });
  }

  // Handle form submission for adding or updating a branch
  onSubmit(): void {
    if (this.selectedBranch) {
      // Update existing branch
      this.branchService.updateBranch(this.selectedBranch.id_branch!, this.formData).subscribe(updated => {
        console.log('Updated:', updated);
        this.cancelEdit(); // Reset form after update
        this.getBranches(); // Refresh branch list
      });
    } else {
      // Add new branch
      this.branchService.addBranch(this.formData).subscribe(added => {
        console.log('Added:', added);
        this.resetForm();
        this.getBranches(); // Refresh branch list
      });
    }
  }

  // Start editing a branch
  editBranch(branch: BranchResponse): void {
    this.selectedBranch = branch;
    this.formData = { ...branch }; // Clone the branch data into the form
  }

  // Cancel editing and reset the form
  cancelEdit(): void {
    this.selectedBranch = null;
    this.resetForm();
  }

  // Reset the form to its initial state
  resetForm(): void {
    this.formData = {
      nama_branch: '',
      alamat_branch: '',
      latitude_branch: 0,
      longitude_branch: 0
    };
  }
}
