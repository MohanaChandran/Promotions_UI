import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';



// array in local storage for registered keywords
const keywordsKey = 'promotions-keywords';
const documentsKey = 'promotions-documents';
const keywordsJSON = localStorage.getItem(keywordsKey);
const documentsJSON = localStorage.getItem(documentsKey);
let keywords: any[] = keywordsJSON ? JSON.parse(keywordsJSON) : [{
    id: 1,
    name: 'Marketing',
    description: 'This keyword is for marketing' ,
    documemtMappings :
    [{
        id:33, 
        documentId: 5,
        keywordId: 1,
        document:{
            id: 1,
            name: 'Marketing',
            url : 'http://google.com'
        }

    } 
    ,{
        id:34,
        documentId: 6,
        keywordId: 1,
        document:{
            id: 1,
            name: 'Marketing',
            url : 'http://google.com'
        }
    } ]   
},
{
    id: 2,
    name: 'Sales',
    description: 'This keyword is for Sales' ,
    documemtMappings :
    [{
        id:33, 
        documentId: 1,
        keywordId: 2,
        document:{
            id: 1,
            name: 'Marketing',
            url : 'http://google.com'
        }
    } 
    ,{
        id:34,
        documentId: 2,
        keywordId: 2,
        document:{
            id: 1,
            name: 'Marketing',
            url : 'http://google.com'
        }
    } ]  

}];

let documents: any[] = documentsJSON ? JSON.parse(documentsJSON) : [
    {
        id: 1,
        name: 'Marketing',
        url : 'http://google.com'
    }
    ,{
        id: 2,
        name: 'Sales',
        url : 'http://google-sales.com'
    }
    ,{
        id: 3,
        name: 'Finance',
        url : 'http://google3.com'
    }
    ,{
        id: 4,
        name: 'Marketing',
        url : 'http://google4.com'
    }
    ,{
        id: 5,
        name: 'Marketing',
        url : 'http://google5.com'
    }
    ,{
        id: 6,
        name: 'Marketing',
        url : 'http://google6.com'
    }
    ,{
        id: 7,
        name: 'Finance',
        url : 'http://google7.com'
    }
    ,{
        id: 8,
        name: 'Marketing',
        url : 'http://google8.com'
    }
    ,{
        id: 9,
        name: 'Marketing',
        url : 'http://google9.com'
    }
    ,{
        id: 10,
        name: 'Marketing',
        url : 'http://google10.com'
    }
    ,{
        id: 11,
        name: 'Sales',
        url : 'http://facebook.com'
    }

];



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/keywords') && method === 'GET':
                    return getkeywords();
                case url.match(/\/keywords\/\d+$/) && method === 'GET':
                    return getkeywordById();
                case url.endsWith('/keywords') && method === 'POST':
                    return createkeyword();
                case url.match(/\/keywords\/\d+$/) && method === 'PUT':
                    return updatekeyword();
                case url.match(/\/keywords\/\d+$/) && method === 'DELETE':
                    return deletekeyword();
                case url.endsWith('/document') && method === 'GET':
                    return getDocuments();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function getkeywords() {
            return ok(keywords.map(x => basicDetails(x)));
        }

        function getDocuments() {
            return ok(documents.map(x => basicDocDetails(x)));
        }


        function getkeywordById() {
            const keyword = keywords.find(x => x.id === idFromUrl());
            return ok(basicDetails(keyword));
        }

        function createkeyword() {
            const keyword = body;

            if (keywords.find(x => x.name === keyword.name)) {
                return error(`keyword with the name ${keyword.name} already exists`);
            }

            // assign keyword id and a few other properties then save
            keyword.id = newkeywordId();           
            keywords.push(keyword);
            localStorage.setItem(keywordsKey, JSON.stringify(keywords));

            return ok();
        }

        function updatekeyword() {
            let params = body;
            let keyword = keywords.find(x => x.id === idFromUrl());

            if (params.name !== keyword.name && keywords.find(x => x.name === params.name)) {
                return error(`keyword with the name ${params.name} already exists`);
            }
            // update and save keyword
            Object.assign(keyword, params);
            localStorage.setItem(keywordsKey, JSON.stringify(keywords));

            return ok();
        }

        function deletekeyword() {
            keywords = keywords.filter(x => x.id !== idFromUrl());
            localStorage.setItem(keywordsKey, JSON.stringify(keywords));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: any) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function basicDetails(keyword: any) {
            const { id, name, description, documemtMappings } = keyword;
            return { id, name, description, documemtMappings };
        }

        function basicDocDetails(keyword: any) {
            const { id, name, url } = keyword;
            return { id, name, url };
        }


        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newkeywordId() {
            return keywords.length ? Math.max(...keywords.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};