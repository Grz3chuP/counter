import {signal} from "@angular/core";
import {Category} from "../interfaces/CategoriesInterfaces";

export const categoryList = signal <Category[]>([])

export const categoryIdStore = signal <number | undefined>(undefined)
