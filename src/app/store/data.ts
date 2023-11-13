import {signal} from "@angular/core";
import {Category} from "../interfaces/CategoriesInterfaces";

export const loading = signal <boolean>(false)
export const categoryList = signal <Category[]>([])

export const isClicked = signal <boolean>(false)

export const categoryIdStore = signal <number | undefined>(undefined)

export function manageButtonClicked() {
  isClicked.set(true)
  setTimeout(() => {
    isClicked.set(false)
  }, 150)

}
