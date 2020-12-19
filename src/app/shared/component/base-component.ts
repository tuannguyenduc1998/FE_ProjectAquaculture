import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
// import { RoleService } from '../services/role.service';

export class BaseComponent {
    constructor(
        public router: Router,
        // public roleService: RoleService,
        public featureId?: string,
        public missPermissionString?: string
    ) { }
    // isExistRoll(featureId: string): any {
    //     return this.roleService.cacheRole[featureId];
    // }
    // isNotExistRoll(featureId: string): any {
    //     return !this.isExistRoll(featureId);
    // }
}
