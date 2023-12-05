import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: "ბლოგი" },
    children: [
      {
        path: '',
        component: BlogComponent
      },
      {
        path: 'blog-details/:key',
        component: BlogDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
