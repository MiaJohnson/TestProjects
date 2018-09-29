import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

describe('AppComponent Tests', () => {
  let service: AppService;
  let backend: HttpTestingController;
  
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ AppService ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    service = TestBed.get(AppService);
    backend = TestBed.get(HttpTestingController);
  });

  describe('Service Request', () => {
    const wordPressUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

    it('Should expect One url', () => {
      service.getAll().subscribe();
      backend.expectOne(wordPressUrl);
      backend.verify();
    });

    it('Should expect One url and method', () => {
      service.getAll().subscribe();
      backend.expectOne({url: wordPressUrl});
      service.getAll().subscribe();
      backend.expectOne({url: wordPressUrl, method: 'GET'});
      backend.verify();
    });

    it('Should not expect one when not subscribed', () => {
      service.getAll()// .subscribe();
      backend.expectNone(wordPressUrl);
      backend.verify();
    });

    it('Should not expect two', () => {
      service.getAll().subscribe();
      backend.expectOne(wordPressUrl);
      backend.expectNone(wordPressUrl);
      backend.verify();
    });

    it('Should expect One request', () => {
      service.getAll().subscribe();
      backend.expectOne((request: HttpRequest<any>) => {
        return request.url.match(/posts/) &&
              request.method === 'GET';
      });
      backend.verify();
    });
 it('Should expectOne request different style (using TestRequest)', () => {
      service.getAll().subscribe();
      const call: TestRequest = backend.expectOne(wordPressUrl);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    });

    it('Should match', () => {
      service.getAll().subscribe();
      backend.match((request) => {
        return request.url.match(/posts/) &&
               request.method === 'GET';
      });
      backend.verify();
    });

    // it('Should match two requests', () => {
    //   service.getAll().subscribe();
    //   service.get(1).subscribe();
    //   backend.match((request) => {
    //     return request.url.match(/posts/) &&
    //           request.method === 'GET';
    //   });
    //   backend.verify();
    // });

    // it('Should match two requests', () => {
    //   service.getAll().subscribe();
    //   service.get(1).subscribe();
    //   const calls = backend.match((request) => {
    //     return request.url.match(/posts/) &&
    //            request.method === 'GET';
    //   });
    //   expect(calls.length).toEqual(2);
    //   expect(calls[0].request.url).toEqual(wordPressUrl);
    //   expect(calls[1].request.url).toEqual(wordPressUrl + `/1.json`);
    //   backend.verify();
    // });

    // it('Should match different requests', () => {
    //   service.getAll().subscribe();
    //   service.get(1).subscribe();
    //   const otherCalls = backend.match((request) => {
    //     return request.url == wordPressUrl + `/1.json` &&
    //            request.method === 'GET';
    //   });
    //   const calls = backend.match((request) => {
    //     return request.url == wordPressUrl &&
    //            request.method === 'GET';
    //   });
    //   expect(calls.length).toEqual(1);
    //   expect(otherCalls.length).toEqual(1);
    //   expect(calls[0].request.url).toEqual(wordPressUrl);
    //   expect(otherCalls[0].request.url).toEqual(wordPressUrl + `/1.json`);
    //   backend.verify();
    // });

    // it('Should have url and urlWithParams', () => {
    //   service.getAll({page: 1}).subscribe();
    //   const calls = backend.match((request) => {
    //     return request.url == wordPressUrl &&
    //            request.urlWithParams == wordPressUrl + `?page=1` &&
    //            request.method === 'GET';
    //   });
    //   backend.expectNone(wordPressUrl); // If url with params, use `.match`
    //   backend.verify();
    // });

    // it('Should have a few more attributes on request that are useful', () => {
    //   service.getAll({page: 1}).subscribe();
    //   const calls = backend.match((request: HttpRequest<any>) => {
    //     return request.url == wordPressUrl &&
    //            request.urlWithParams == wordPressUrl + `?page=1` &&
    //            request.method === 'GET' &&
    //            request.params.get('page') == '1' &&
    //            request.body == null &&
    //            request.headers instanceof HttpHeaders &&
    //            request.responseType == 'json' &&
    //            request.withCredentials == false;
    //   });
    //   backend.expectNone(wordPressUrl); // If url with params, use `.match`
    //   backend.verify();
    // });


  });

  describe('Responses', () => {
    const wordPressUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

    it('Should get Posts', () => {
      const response = [{
        'id': 1,
        'title': 'Testing HttpClient',
        'content': 'A long description...',
        'created_at': '2017-12-07T04:39:49.447Z',
        'updated_at': '2017-12-07T04:39:49.447Z'
      }];
      service.getAll().subscribe((result) => {
        // The benefits here are not to test the data you entered but really to test
        // that your service or component handle specific response appropriately.
        expect(result.length).toEqual(1);
        expect(result[0].title).toEqual('Testing HttpClient');
        //expect(new Date(result[0].created_at)).toEqual(new Date('2017-12-07T04:39:49.447Z'));
      });
      backend.expectOne(wordPressUrl).flush(response);
      backend.verify();
    });

       
    // it('Should getPost different style', () => {
    //   const response = {
    //     'id': 1,
    //     'title': 'Testing HttpClient',
    //     'content': 'A long description...',
    //     'created_at': '2017-12-07T04:39:49.447Z',
    //     'updated_at': '2017-12-07T04:39:49.447Z'
    //   };
    //   service.get(1).subscribe((result) => {
    //     expect(result.title).toEqual('Testing HttpClient');
    //   });
    //   const call = backend.expectOne(`https://rails-rest.herokuapp.com/posts/1.json`);
    //   expect(call.request.method).toEqual('GET');
    //   call.flush(response);
    //   backend.verify();
    // });

    // it('Should create post', () => {
    //   service.save({
    //     title: 'Creating a post',
    //     content: 'Another long description...'
    //   }).subscribe((response) => {
    //     expect(response).toEqual(jasmine.objectContaining({
    //       id: 2,
    //       title: 'Creating a post',
    //       content: jasmine.any(String),
    //       created_at: new Date('2017-12-07T04:39:49.447Z'),
    //       updated_at: jasmine.any(Date)
    //     }));
    //   });
    //   const response = {
    //     'id': 2,
    //     'title': 'Creating a post',
    //     'content': 'Another long description...',
    //     'created_at': '2017-12-07T04:39:49.447Z',
    //     'updated_at': '2017-12-07T04:39:49.447Z'
    //   };
    //   const call = backend.expectOne(wordPressUrl);
    //   expect(call.request.method).toEqual('POST');
    //   call.flush(response);
    //   backend.verify();
    // });

    // it('Should handle server error', () => {
    //   service.save({
    //     title: 'Trying something dangerous'
    //   }).subscribe((response) => {
    //     throw('Should not land here');
    //   }, (error) => {
    //     expect(error.status).toEqual(422);
    //     expect(error.statusText).toEqual('Boom');
    //   });

    //   backend.expectOne(wordPressUrl).flush({}, {status: 422, statusText: 'Boom'});
    //   backend.verify();
    // });

    // it('Should handle network error', () => {
    //   service.save({
    //     title: 'Trying something dangerous'
    //   }).subscribe((response) => {
    //     throw('Should not land here');
    //   }, (error) => {
    //     expect(error.status).toEqual(422);
    //     expect(error.statusText).toEqual('Some server error');
    //   });

    //   backend.expectOne(wordPressUrl).error(
    //     new ErrorEvent(''), {
    //     status: 422,
    //     statusText: 'Some server error'
    //   });
    //   backend.verify();
    // });

    // it('Should update post', () => {
    //   service.save({
    //     id: 2,
    //     title: 'Updating a post'
    //   }).subscribe((result) => {
    //     expect(result.id).toEqual(2);
    //   });
    //   const response = {
    //     'id': 2,
    //     'title': 'Updating a post',
    //     'content': 'Another long description...',
    //     'created_at': '2017-12-07T04:39:49.447Z',
    //     'updated_at': '2017-12-07T04:39:49.447Z'
    //   };
    //   const call = backend.expectOne(`https://rails-rest.herokuapp.com/posts/2.json`);
    //   expect(call.request.method).toEqual('PUT');
    //   call.flush(response);
    //   backend.verify();
    // });

    // it('Should delete post', () => {
    //   service.delete({
    //     id: 2,
    //   }).subscribe();
    //   const call = backend.expectOne(`https://rails-rest.herokuapp.com/posts/2.json`);
    //   expect(call.request.method).toEqual('DELETE');
    //   call.flush({});
    //   backend.verify();
    // });

    // it('Should fire only once', () => {
    //   service.get(1).subscribe((response) => {
    //     expect(response.id).toEqual(1);
    //   });
    //   service.get(2).subscribe((response) => {
    //     expect(response.id).toEqual(2);
    //   });
    //   const call1: TestRequest = backend.expectOne(wordPressUrl + `/1.json`);
    //   const call2: TestRequest = backend.expectOne(wordPressUrl + `/2.json`);
    //   call2.flush({id: 2});
    //   expect(call2.cancelled).toBeTruthy(); // http.get close after firing.
    //   call1.flush({id: 1});
    //   backend.verify();
    // });

    // it('Should cancel previous request (switchMap)', () => {
    //   let counter = 2;
    //   service.setupGetRequestSubject().subscribe((response) => {
    //     expect(response.id).toEqual(counter++);
    //     expect(response.id).toBeGreaterThan(1);
    //     expect(response.id).toBeLessThan(4);
    //   });
    //   service.getViaSubject(1);
    //   service.getViaSubject(2);
    //   const call1 = backend.expectOne(`https://rails-rest.herokuapp.com/posts/1.json`);
    //   const call2 = backend.expectOne(`https://rails-rest.herokuapp.com/posts/2.json`);
    //   expect(call1.cancelled).toBeTruthy(); // second call cancelled first one
    //   call2.flush({id: 2});
    //   expect(call2.cancelled).toBeTruthy();
    //   service.getViaSubject(3);
    //   const call3 = backend.expectOne(`https://rails-rest.herokuapp.com/posts/3.json`);
    //   expect(call3.cancelled).toBeFalsy();
    //   call3.flush({id: 3});
    //   expect(call3.cancelled).toBeTruthy();
    //   backend.verify();
    // });

  });



  it('Should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`Should have as title 'Wordpress Display Posts'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Wordpress Display Posts');
  }));
  
//   it('expects service to fetch data with proper sorting',
//   inject([HttpTestingController, AppService],
//     (httpMock: HttpTestingController, service: AppService) => {
//       // We call the service
//       service.getAll().subscribe(data => {
//         expect(data.pageInfo.totalRecordCount).toBe(21);
//         expect(data.pageInfo.pageNumber).toBe(0);
//         expect(data.data.length).toBe(7);
//       });
//       // We set the expectations for the HttpClient mock
//       const req = httpMock.expectOne('https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts');
//       expect(req.request.method).toEqual('GET');
//       // Then we set the fake data to be returned by the mock
//       req.flush({data: ...});
//     })
// );
// afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
//   httpMock.verify();
// }));

 
});
