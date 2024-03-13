import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'otp-verification-component';
  otp: string[] = ['', '', '', ''];
  otpCode: string = '1234'
  userEnteredOptCode: string = ''

  constructor(private toastr: ToastrService) { }

  moveToNext(event: any, index: number) {
    this.otp[index] = '';
    if (event.target.value.length === 1 && index < this.otp.length) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  clearInput(index: number) {
    this.otp[index] = '';
  }

  verifyOtp() {
    this.userEnteredOptCode = this.otp.join('');
    if (this.userEnteredOptCode === this.otpCode) {
      this.toastr.success('Verified!', 'Success');
    } else {
      this.toastr.error('Invalid OTP', 'Fail')
    }
  }

  onPaste(event: ClipboardEvent, index: number) {
    // Prevent the default paste behavior
    event.preventDefault();

    // Get the pasted text
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    const otpDigits = pastedText.split('').filter((digit: string) => !isNaN(parseInt(digit, 10)));

    // Assign pasted digits to the corresponding OTP index
    for (let i = 0; i < Math.min(otpDigits.length, this.otp.length); i++) {
      this.otp[i] = otpDigits[i];
    }
  }
}
