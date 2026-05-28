import type { ResultOf } from "gql.tada";
import type {
  NodeArticleFragment,
  NodePageFragment,
} from "~/graphql/fragments/node";

export type NodeResultOf =
  | ResultOf<typeof NodePageFragment>
  | ResultOf<typeof NodeArticleFragment>;
