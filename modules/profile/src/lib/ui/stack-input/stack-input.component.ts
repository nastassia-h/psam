import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-stack-input',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StackInputComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackInputComponent implements ControlValueAccessor {
  onChange = (val: string[]) => {
    // do nothing
  }
 
  onTouched = () => {
    // do nothing
  }

  disabled = signal<boolean>(false)

  value$ = new BehaviorSubject<string[]>([])

  innerInput = ''

  writeValue(stackArr: string[] | null): void {
    if (!stackArr) {
      this.value$.next([])
      return;
    };
    this.value$.next(stackArr)
  }

  registerOnChange(fn: any): void {
   this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  removeStack(val: string) {
    const filteredStack = this.value$.value.filter((stack) => stack !== val)
    this.value$.next(filteredStack)
    this.onChange(this.value$.value)
  }

  addStack(event: Event) {
    event.stopPropagation()
    event.preventDefault()
    if (!this.innerInput) return;
    this.value$.next([...this.value$.value, this.innerInput.trim()])
    this.innerInput = ''
    this.onChange(this.value$.value)
  }
}
