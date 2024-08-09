// Copyright 2024 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package outputfilter

import (
	"reflect"
	"testing"
)

func TestTransformMessagesInTextField(t *testing.T) {
	tests := []struct {
		name     string
		entry    *Entry
		expected *Entry
	}{
		{
			name:     "Remove response status codes",
			entry:    &Entry{Text: " property for the response status '200'"},
			expected: &Entry{Text: " property"},
		},
		{
			name:     "Set value removed",
			entry:    &Entry{Text: "default value changed from 'some_value' to 'null'"},
			expected: &Entry{Text: "default value was removed"},
		},
		{
			name:     "Set value set",
			entry:    &Entry{Text: "default value changed from 'null' to 'some_value'"},
			expected: &Entry{Text: "default value was set to 'some_value'"},
		},
		{
			name:     "Remove inline schema index",
			entry:    &Entry{Text: "BaseSchema[123]: some text"},
			expected: &Entry{Text: " some text"},
		},
		{
			name:     "Remove redundant oneOf/allOf",
			entry:    &Entry{Text: "/oneOf/components/schemas/ViewName/"},
			expected: &Entry{Text: ""},
		},
		{
			name:     "Mixed transformations",
			entry:    &Entry{Text: "default value changed from 'null' to 'some_value' BaseSchema[123]: /oneOf/components/schemas/ViewName/"},
			expected: &Entry{Text: "default value was set to 'some_value'  "},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			actual := transformMessage(tt.entry)
			if !reflect.DeepEqual(actual, tt.expected) {
				t.Errorf("transformMessagesInTextField() = %v, want %v", actual, tt.expected)
			}
		})
	}
}