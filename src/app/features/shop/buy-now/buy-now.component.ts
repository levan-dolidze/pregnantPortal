import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Stuffs } from 'src/app/admin/models/shop';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { BankAccountsComponent } from 'src/app/shared/components/bank-accounts/bank-accounts.component';
import { FieldModeControl } from 'src/app/shared/functions/sharedFunctions';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss']
})
export class BuyNowComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public languageService: LanguageService,
    @Optional() public dialogRef: MatDialogRef<BuyNowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stuffDetails: Stuffs },
    private shopService: ShopService,
    public _snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
    private dialog: MatDialog,



  ) {

  }


  seasons: string[] = ['terms'];

  order: any
  ngOnInit(): void {

    this.initForm()


    console.log(this.data.stuffDetails.productType)


    this.getTermTxt()

  }

  get uid(): any {
    return this.localStorage.getTokenResult
  }

  termTxt: string;
  getTermTxt() {

    switch (this.data.stuffDetails.productType) {
      case 'stuffs':

        this.termTxt = ''
        break;
      case 'courses':
        this.termTxt = 'assets/pdfs/terms-school.pdf';

        console.log(this.termTxt)
        break;

      default:
        break;
    }

  }

  form: FormGroup;

  initForm() {

    this.form = this.fb.group({

      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      IDNumber: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      terms: [null, [Validators.required]]
    })

  }

  onSubmit() {


    if (this.form.invalid) {

      console.log(this.form.value)
      FieldModeControl.formFieldsModeControl('markAsDirty', this.form)
      return
    } else {

      const params = {
        ...
        this.form.value,
        stuff: this.data.stuffDetails,
        uid: this.uid.uid
      }


      switch (this.data.stuffDetails.productType) {
        case 'courses':
          this.shopService.buyCourse(params).subscribe({

            next: (() => {

              this._snackBar.openFromComponent(AlertComponent, {
                duration: 2000,
                data: {
                  message: 'შეკვეთა წარმატებით შესრულდა!',
                  type: 'success'
                }
              })
              this.dialogRef.close()

              const dialogRef = this.dialog.open(BankAccountsComponent, {
                width: 'auto',
                height: 'auto',
              });


            }),
            error: ((err) => {
              this._snackBar.openFromComponent(AlertComponent, {
                duration: 2000,
                data: {
                  message: 'შეკვეთა ვერ მოხდა!',
                  type: 'error'
                }
              })
              console.error(err)

            })
          })
          break;
        case 'stuffs':
          this.shopService.buyStuff(params).subscribe({

            next: (() => {

              this._snackBar.openFromComponent(AlertComponent, {
                duration: 2000,
                data: {
                  message: 'შეკვეთა წარმატებით შესრულდა!',
                  type: 'success'
                }
              })
              this.dialogRef.close()

              const dialogRef = this.dialog.open(BankAccountsComponent, {
                width: 'auto',
                height: 'auto',
              });


            }),
            error: ((err) => {
              this._snackBar.openFromComponent(AlertComponent, {
                duration: 2000,
                data: {
                  message: 'შეკვეთა ვერ მოხდა!',
                  type: 'error'
                }
              })
              console.error(err)

            })
          })
          break;

        default:
          break;
      }



    }

  }

}
