import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PersonsActivitiesService } from './activity-register.service';

describe('PersonsActivitiesService', () => {
  let service: PersonsActivitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonsActivitiesService],
    });

    service = TestBed.inject(PersonsActivitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all persons', () => {
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

  it('should add activities to a person', () => {
    const mockActivities = ['Activity 1', 'Activity 2'];
    const personId = '1';

    service
      .addActivitiesToPerson(personId, mockActivities)
      .subscribe((response) => {
        expect(response.status).toBe(201);
      });

    const req = httpMock.expectOne(
      `http://localhost:3000/${personId}/addActivitiesToPerson`
    );
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 201, statusText: 'Created' });
  });
});
