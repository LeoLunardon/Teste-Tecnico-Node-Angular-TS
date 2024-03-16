import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RegisterService } from './register.service';

interface RegisterResponse {
  email: string;
  password: string;
  username: string;
}

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should register a user', () => {
    const dummyUser: any = {
      email: 'teste@teste.com',
      password: '123456',
      username: 'teste',
    };
    
    service
      .register(dummyUser.email, dummyUser.password, dummyUser.username)
      .subscribe((user: RegisterResponse) => {
        expect(user.email).toEqual(dummyUser.email);
        expect(user.password).toEqual(dummyUser.password);
        expect(user.username).toEqual(dummyUser.username);
      });

    const req = httpMock.expectOne('http://localhost:3000/createUser');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
