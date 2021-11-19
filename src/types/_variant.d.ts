/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Name of the variant, usually indicating the platform for which the variant is intended, such as WordPress, or Drupal9
 */
export type Platform = 'drupal';
/**
 * Array containing an object for each structure specified in the system to which this variant belongs
 */
export type StructureImplementations = {
  /**
   * Name of the structure being implemented. MUST correspond with the name of a structure specified within the variant's system
   */
  name: string;
  /**
   * Relative path to the folder that will hold all of the assets, components, and files related to the structure
   */
  directory: string;
}[];
/**
 * Array containing objects that describe each component available within the variant
 */
export type Components = {
  /**
   * Name of the component. MUST correspond with the folder name containing the component
   */
  name: string;
  /**
   * Name of the structure to which the component belongs. This, along with the name, will determine which folder the component will live in
   */
  structure: string;
  /**
   * Text describing the intended purpose of the component
   */
  description?: string;
  /**
   * Boolean indicating whether or not the component is required
   */
  required?: boolean;
}[];
/**
 * Array containing objects that define general directories. These directories should contain files and assets that do not belong in a structure folder (such as font files)
 */
export type Directories = {
  /**
   * Name of the directory/folder
   */
  name: string;
  /**
   * Relative path to the directory that will be exported
   */
  path: string;
  /**
   * Relative path (from the Emulsify project root) to the destination folder
   */
  destinationPath: string;
  /**
   * Text describing the intended purpose of the folder
   */
  description?: string;
}[];
/**
 * Array containing objects that define general files.
 */
export type Files = {
  /**
   * Name of the file
   */
  name: string;
  /**
   * Relative path to the file that will be exported
   */
  path: string;
  /**
   * Relative path (from the Emulsify project root) to the destination file
   */
  destinationPath: string;
  /**
   * Text describing the intended purpose of the file
   */
  description?: string;
}[];

export interface EmulsifyVariant {
  platform: Platform;
  structureImplementations: StructureImplementations;
  components: Components;
  directories?: Directories;
  files?: Files;
}
