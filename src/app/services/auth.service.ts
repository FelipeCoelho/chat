import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
// import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/observable/of' 
import { Alert } from '../classes/alert';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore ) {

      this.afAuth.authState.pipe(
        switchMap(
          (user) => {
            if (user) {
              return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
              return Observable.of(null);
            }
          } 
        )
      );
      // this.currentUser = this.afAuth.authState.pipe(switchMap((user)=>{
      //   if (user){
      //     return this.db.doc<User>(`users/${user.id}`).valueChanges();
      //   }
      // }))
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
   return Observable.fromPromise(
     this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
       const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`)
       return true;
     })
   );
  }

  public login(email:string, password: string ): Observable<boolean>{
    return of(true);
  }

  public logout() : void {
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }

}
