import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalBroadcastService } from '@azure/msal-angular';
import { EventType } from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Redirecting...</p>`
})
export class RedirectComponent implements OnInit {
  private msalBroadcast = inject(MsalBroadcastService);
  private router = inject(Router);

  ngOnInit(): void {
    this.msalBroadcast.msalSubject$
      .subscribe(msg => {
        console.log(msg)
        if (msg.eventType === EventType.LOGIN_SUCCESS) {
          this.router.navigate(['/']);
        }
      });
  }
}
