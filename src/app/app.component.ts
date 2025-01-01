import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";
import { ApiService } from './api.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, ItemComponent] // Import provideHttpClient
})

export class AppComponent implements OnInit {

  data: string = '{ "" : "" }';  // Variable to store API response

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe((response) => {
      this.data = JSON.stringify(response);  // Convert response to a string (if it's an object)
    },
    (error) => {
      console.error('Error fetching data:', error);  // Handle error if API call fails
      this.data = 'Error fetching data';  // Assign error message to result
    });
  }

  get parsedData() {
    return JSON.parse(this.data);
  }

  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  addItem(description: string) {
    if (!description) return;
  
    this.allItems.unshift({
      description,
      done: false
    });
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
  
}
