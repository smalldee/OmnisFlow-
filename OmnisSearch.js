// Offline fulltext search using FlexSearch
import FlexSearch from "flexsearch";
export const index = new FlexSearch.Index({ tokenize: "forward", preset: "match" });

export function addDocument(id, text) {
  index.add(id, text);
}

export function search(query) {
  return index.search(query);
}
    