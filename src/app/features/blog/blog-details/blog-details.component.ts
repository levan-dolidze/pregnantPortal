import { Component, OnInit } from '@angular/core';
import { BlogComponent } from '../blog.component';
import { BlogResponse } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent extends BlogComponent implements OnInit {



  blogPosts: BlogResponse


  override ngOnInit(): void {
    super.ngOnInit(); // Call parent's ngOnInit if needed

    this.getBlogPosts(); // Accessing method from parent

    this.blogPosts$.subscribe((res) => {

      this.blogPosts = res.find((x => x.key === this.route.snapshot.paramMap.get('key')))

    })
  }


}
