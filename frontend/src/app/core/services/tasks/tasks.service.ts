import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    http: HttpClient = inject(HttpClient);

    createTask (title: string, description: string, project: string, milestone: string) {
        const data = { title, description, project, milestone };
        return this.http.post(`${environments.API_BASE_URL}/tasks/create-task`, data);
    }

    getTasksOfMilestone(milestone: string, project: string) {
        const data = { milestone }
        return this.http.get(`${environments.API_BASE_URL}/tasks/get-tasks/68812f55f86f2829bbe494d8/68823843204b0a6e7b785c0a`);
    }
}