import Swal from "sweetalert2";
import * as PropertyHelpers from "../helpers/propertyHelpers"; // Adjust the import path as necessary

// Assuming a type for the property data. You should replace this with the actual type.
interface PropertyData {
  image: File | null;
  // Add other property fields here as needed
}

export const uploadImage = async (image: File): Promise<string> => {
  console.log("Uploading image...");
  try {
    const imageUrl = await PropertyHelpers.uploadImage(image);
    console.log("Image uploaded successfully:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throwing the error to be handled by the caller
  }
};

export const submitPropertyToFirebase = async (
  propertyData: PropertyData,
): Promise<string> => {
  console.log("Preparing to submit property...");
  try {
    return "";
  } catch (error) {
    console.error("Error submitting property:", error);
    throw error; // Re-throwing the error to ensure it can be handled or logged by the caller
  }
};

export const preparePropertyData = (
  formData: PropertyData,
  imageUrl: string = "",
): PropertyData => {
  console.log("Preparing property data with image URL:", imageUrl);
  // Implement any necessary transformation or addition of imageUrl to formData here
  // This is a placeholder implementation. Replace it with actual logic as needed.
  return {
    ...formData,
    imageUrl, // Assuming the formData structure can accept an imageUrl field directly
  };
};

interface PropertyData {
  image: File | null;
  // Add other property fields here as needed
  imageUrl?: string; // Add the 'imageUrl' property to the 'PropertyData' interface
}
