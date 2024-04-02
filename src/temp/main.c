#include <stdio.h>

int main() {
    float num1, num2;

    // Prompt the user to enter the first number
    printf("Enter the first number: ");
    scanf("%f", &num1);

    // Prompt the user to enter the second number
    printf("Enter the second number: ");
    scanf("%f", &num2);

    // Calculate the sum
    float sum = num1 + num2;

    // Print the sum
    printf("The sum of %.2f and %.2f is: %.2f\n", num1, num2, sum);

    return 0;
}
