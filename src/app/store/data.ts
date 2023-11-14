import {signal} from "@angular/core";
import {Category} from "../interfaces/CategoriesInterfaces";

export const loading = signal <boolean>(false)
export const categoryList = signal <Category[]>([])

export const isClicked = signal <boolean>(false)

export const categoryIdStore = signal <number | undefined>(undefined)

export let totalValueForAllEvents = signal <number>(0)

export let totalEventsNumberForAllEvents = signal <number>(0)

export function manageButtonClicked() {
  isClicked.set(true)
  setTimeout(() => {
    isClicked.set(false)
  }, 150)

}
