import { FragmentOf } from "gql.tada";
import { MediaImageFragment } from "~/graphql/fragments/media";
import { NodeArticleFragment, NodePageFragment } from "~/graphql/fragments/node";
import { TermTagsFragment } from "~/graphql/fragments/terms";

export type EntityFragmentType = 
  FragmentOf<typeof NodePageFragment> | 
  FragmentOf<typeof NodeArticleFragment> |
  FragmentOf<typeof TermTagsFragment>;

export type ImageElement = FragmentOf<typeof MediaImageFragment> | null;
