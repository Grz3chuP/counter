import {signal} from "@angular/core";
import {Category} from "../interfaces/CategoriesInterfaces";

export const loading = signal <boolean>(false)
export const categoryList = signal <Category[]>([])

export const categoryIdStore = signal <number | undefined>(undefined)
