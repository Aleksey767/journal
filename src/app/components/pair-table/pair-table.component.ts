import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pair-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pair-table.component.html',
    styleUrls: ['./pair-table.component.scss']
})
export class PairTableComponent {
    @Input() pairs: { teamA: string, teamB: string }[] = [];
}
