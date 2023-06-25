import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/')
  async dashboard(): Promise<any> {
    const user = await this.adminService.countUser();
    const product = await this.adminService.countProduct();
    const order = await this.adminService.countOrder();
    const pendapatan = await this.calculateYearlyRevenue();
    const sumPendaptan = await this.adminService.sumPendapatan();

    return {
      user,
      product,
      order,
      pendapatan,
      totalPendapatan: sumPendaptan,
    };
  }

  private async calculateYearlyRevenue() {
    try {
      const monthlyRevenue: number[] = [];

      for (let month = 1; month <= 12; month++) {
        const revenue = await this.adminService.pendapatan(month);
        monthlyRevenue.push(revenue);
      }

      return monthlyRevenue;
    } catch (error) {
      throw new Error(`Failed to calculate yearly revenue: ${error}`);
    }
  }
}
