import { TestBed } from '@angular/core/testing';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';
import { CascadeDemo } from './cascade-demo';

describe('CascadeDemo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CascadeDemo],
      providers: [provideOptimus({ theme: { preset: Aura } })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CascadeDemo);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render p-cascadeselect', async () => {
    const fixture = TestBed.createComponent(CascadeDemo);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('p-cascadeselect')).not.toBeNull();
    expect(el.querySelector('.selected')?.textContent).toContain('none');
  });
});
