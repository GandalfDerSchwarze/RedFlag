type applicationName =
    "Chat"

export interface ApplicationDto {
    application: applicationName,
    description: string,
    imageSrc: string,
    imageAlt: string,
    link: string
}