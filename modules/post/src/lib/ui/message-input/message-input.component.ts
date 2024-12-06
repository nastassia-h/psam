import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-message-input',
  standalone: true,
  imports: [FormsModule, AvatarCircleComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
  r2 = inject(Renderer2)
  avatarUrl = input<string | null>();
  inputValue = ''

  @Input() eventName = ''; 
  @Output() created = new EventEmitter<{ data: string }>()

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreate() {
    if (this.inputValue === '') return 
    this.created.emit({ data: this.inputValue });
    this.inputValue = '';
  }
}
