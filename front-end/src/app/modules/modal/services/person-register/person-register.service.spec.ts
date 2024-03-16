import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PersonRegisterService } from './person-register.service';

describe('PersonRegisterService', () => {
  let service: PersonRegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonRegisterService],
    });

    service = TestBed.inject(PersonRegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a person', () => {
    const mockData = {
      email: 'test@test.com',
      name: 'Test',
      street: 'Test Street',
      number: '123',
      complement: 'Apt 4',
      city: 'Test City',
    };

    service.createPerson(mockData).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne('http://localhost:3000/create');
    expect(req.request.method).toBe('POST');
    req.flush(mockData, { status: 201, statusText: 'Created' });
  });
});
