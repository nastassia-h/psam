import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndDirective } from '@psam/common-ui';

@Component({
  selector: 'lib-avatar-upload',
  standalone: true,
  imports: [DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/img/blank-user.png')

  avatar: File | null = null;

  processFile(file: File | null) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file)
    this.avatar = file;
  }

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] as File | null;
    this.processFile(file)
  }

  onFileDropped(file: File) {
    this.processFile(file)
  }
}
