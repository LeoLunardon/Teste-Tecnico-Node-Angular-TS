import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PersonsListService } from './person-list.service';

describe('PersonsListService', () => {
  let service: PersonsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonsListService],
    });

    service = TestBed.inject(PersonsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch all persons', () => {
    const mockPersons = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ];

    service.getAllPersons().subscribe((persons) => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(mockPersons);
    });

    const req = httpMock.expectOne('http://localhost:3000/getAllPersons');
    expect(req.request.method).toBe('GET');
    req.flush(mockPersons);
  });

  it('Should fetch person with activities', () => {
    const mockPerson = {
      id: '1',
      name: 'Name test',
      activities: ['Activity 1', 'Activity 2'],
    };

    service.getPersonWithActivities('1').subscribe((person) => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/personWithActivities/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPerson);
  });
});
