import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { AddStuff, FullCourse, OrderedFullCourse, Stuffs } from './models/shop';
import { BehaviorSubject, Observable, map, shareReplay, switchMap } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { Question } from '../features/contact/model';
import { DoctorAnswer } from './admin-contact/models';
import { BlogReq, BlogResponse } from '../shared/models/interfaces';

const addNewStuff = '/AddNewStuff.json'
const addNewCourse = '/AddNewCourse.json'
const addNewFullCourse = '/AddNewFullCourse.json'
const addConfirmedCourse = '/AddConfirmedCourse.json'
const askQuestion = '/Question.json'
const doctorAnswer = '/doctorAnswer.json'
const deleteStuff = '/AddNewStuff/'
const addBlogPost = '/AddBlogPost.json'


@Injectable({
  providedIn: 'root'
})

export class AdminHttpService {


  constructor(
    private apiService: ApiService,
    private firebase: AngularFireDatabase

  ) { }


  //show

  addNewStuff(newStuff: AddStuff): Observable<AddStuff> {

    return this.apiService.post(addNewStuff, newStuff)
  }
  addNewCourse(newCourse: AddStuff): Observable<AddStuff> {
    return this.apiService.post(addNewCourse, newCourse)
  }
  addNewFullCourse(newCourse: AddStuff): Observable<AddStuff> {
    return this.apiService.post(addNewFullCourse, newCourse)
  }
  addBlogPost(params: BlogReq): Observable<BlogReq> {
    return this.apiService.post(addBlogPost, params)
  }
  askQuestion(question: Question): Observable<Question> {
    return this.apiService.post(askQuestion, question)
  }
  doctorAnswer(answer: DoctorAnswer): Observable<Question> {
    return this.apiService.post(doctorAnswer, answer)
  }

  getBlogPost(): Observable<BlogResponse[]> {
    return this.apiService.get(addBlogPost).pipe(

      map((res) => {
        if (res) {
          const blogs = []
          for (const key in res) {
            blogs.push({ ...res[key], key: key })
          }
          return blogs

        } else {
          return []
        }

      }),
      shareReplay()

    )
  }
  getQuestions(): Observable<OrderedFullCourse[]> {
    return this.apiService.get(askQuestion).pipe(

      map((res) => {
        if (res) {
          const questions = []
          for (const key in res) {
            questions.push({ ...res[key], key: key })
          }
          return questions

        } else {
          return []
        }

      })
    )
  }

  getStuffs(): Observable<Stuffs[]> {
    return this.apiService.get(addNewStuff).pipe(

      map((res) => {
        if (res) {
          const stuffs = []
          for (const key in res) {
            stuffs.push({ ...res[key], key: key })
          }
          return stuffs

        } else {
          return []
        }

      })
    )
  }
  getCourses(): Observable<Stuffs[]> {
    return this.apiService.get(addNewCourse).pipe(

      map((res) => {
        if (res) {
          const stuffs = []
          for (const key in res) {
            stuffs.push({ ...res[key], key: key })
          }
          return stuffs

        } else {
          return []
        }

      })
    )
  }
  getFullCourses(): Observable<FullCourse[]> {
    return this.apiService.get(addNewFullCourse).pipe(

      map((res) => {
        if (res) {
          const courses = []
          for (const key in res) {
            courses.push({ ...res[key], key: key })
          }
          return courses

        } else {
          return []
        }

      })
    )
  }


  confirmFullCourse(confirmedCourse: OrderedFullCourse) {
    return this.apiService.post(addConfirmedCourse, confirmedCourse)
  }
  getMyConfirmedCourses(): Observable<OrderedFullCourse[]> {
    return this.apiService.get(addConfirmedCourse).pipe(

      map((res) => {
        if (res) {
          const courses = []
          for (const key in res) {
            courses.push({ ...res[key], key: key })
          }
          return courses

        } else {
          return []
        }

      })
    )
  }
  getDoctorAnswers(): Observable<DoctorAnswer[]> {
    return this.apiService.get(doctorAnswer).pipe(

      map((res) => {
        if (res) {
          const answers = []
          for (const key in res) {
            answers.push({ ...res[key], key: key })
          }
          return answers

        } else {
          return []
        }
      })
    )
  }

  public dataSubject = new BehaviorSubject<any>(null);

  deleteStuff(key: any) {
    return this.apiService.delete(deleteStuff, key).pipe(
      switchMap(() => {
        return this.getStuffs().pipe(
          map((res) => {
            this.dataSubject.next(res);
            return res;
          })
        );
      })
    );
  };


  stuffList: AngularFireList<any>;


  insertStuff(imageDetails: any) {
    this.stuffList.push(imageDetails)
  }
  getStuffList() {
    this.stuffList = this.firebase.list('stuff')
  };





}
