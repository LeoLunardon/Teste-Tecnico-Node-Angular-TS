import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer a autenticação com sucesso', () => {
    const dummyPost: any = {
      email: 'teste@teste.com',
      password: '123456',
    };

    service.login(dummyPost.email, dummyPost.password).subscribe((post) => {
      expect(post.email).toEqual(dummyPost.email);
      expect(post.password).toEqual(dummyPost.password);
    });

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyPost);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
