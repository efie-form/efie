#!/bin/bash

# Define the type mappings
types=(
    "SINGLE_CHOICE"
    "MULTIPLE_CHOICES" 
    "DATE"
    "TIME"
    "DATE_TIME"
    "FILE"
    "EMAIL"
    "PHONE"
    "CHECKBOX"
    "ADDRESS"
    "PASSWORD"
    "BLOCK"
    "ROW"
    "COLUMN"
    "GROUP"
    "HEADING"
    "IMAGE"
    "BUTTON"
    "PAGE"
    "DIVIDER"
)

file="/Users/whigon/github/efie/packages/core/lib/types/form-field.type.ts"

for type in "${types[@]}"; do
    # Find interface name (convert SINGLE_CHOICE to SingleChoice, etc)
    interface_name=$(echo $type | sed 's/_/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2)); print}' OFS="")FormField
    
    echo "Updating $interface_name for $type"
    
    # Create sed command to replace the interface
    sed -i '' "s/\(export interface ${interface_name}.*\){\s*type: typeof FieldType\.${type};/\1{\
  sys: {\
    id: string;\
    type: typeof FieldType.${type};\
    name: string;\
  };/g" "$file"
done
