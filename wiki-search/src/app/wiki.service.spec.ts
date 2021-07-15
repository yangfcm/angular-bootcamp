import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WikiService } from './wiki.service';
import { PAGES_DATA } from './page-list/page-list.component.spec';

describe('WikiService', () => {
  let service: WikiService;
  let httpTestingController: HttpTestingController;

  const returnedData = {
    batchcomplete: '',
    continue: {
      continue: '-',
      sroffeset: 10,
    },
    query: {
      search: PAGES_DATA,
    },
  };

  const expectedData = PAGES_DATA;
  const term = 'angular';
  const errorMessage = 'service unavailable';
  let requestUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WikiService);
    requestUrl = `${service.apiUrl}?action=query&format=json&list=search&utf8=1&srsearch=${term}&origin=*`;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data', () => {
    service.search(term).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
    const testRequest = httpTestingController.expectOne(requestUrl);
    expect(testRequest.request.method).toEqual('GET');
    testRequest.flush(returnedData);
  });

  it('should capture the error', () => {
    service.search(term).subscribe(
      (data) => {
        expect(data).toEqual([]);
      },
      (error) => {
        expect(error.message).toContain(errorMessage);
      }
    );
    const testRequest = httpTestingController.expectOne(requestUrl);
    testRequest.flush('error', {
      status: 500,
      statusText: errorMessage,
    });
  });
});
